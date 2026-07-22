import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../repository/user.repository.js";
import * as balanceRepository from "../repository/balances.repository.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    try {
      const balance = await balanceRepository.createBalance(
        user.id,
        0,
        0,
        0,
        0,
      );

      return res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        balance,
      });
    } catch (balanceError) {
      await userRepository.deleteUser(user.id);

      return res.status(500).json({
        message: "User created but balance could not be initialized",
        error: balanceError.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await userRepository.getUsers();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await userRepository.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await userRepository.updateUser(id, username, email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await userRepository.deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getMe(req, res) {
  try {
    const user = await userRepository.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateMe(req, res) {
  try {
    const { username, email } = req.body;

    const user = await userRepository.updateUser(req.user.id, username, email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
