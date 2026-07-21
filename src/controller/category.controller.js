import * as categoryRepository from "../repository/category.repository.js";

export async function createCategory(req, res) {
  try {
    const { name, type, userId, parentId, isDefault } = req.body;

    const category = await categoryRepository.createCategory(
      name,
      type,
      userId ?? null,
      parentId ?? null,
      Boolean(isDefault),
    );

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getCategories(req, res) {
  try {
    const userId = req.query.userId ?? null;

    const categories = await categoryRepository.getCategories(userId);

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const category = await categoryRepository.getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, type, userId, parentId, isDefault } = req.body;

    const category = await categoryRepository.updateCategory(
      id,
      name,
      type,
      userId ?? null,
      parentId ?? null,
      Boolean(isDefault),
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await categoryRepository.deleteCategory(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
