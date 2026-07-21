import * as userRepository from "../repository/user.repository.js";
import * as balanceRepository from "../repository/balances.repository.js";

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userRepository.createUser(username, email, password);

    try {
      const balance = await balanceRepository.createBalance(
        user.id,
        0,
        0,
        0,
        0,
      );

      return res.status(201).json({ user, balance });
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
