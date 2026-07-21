ALTER TABLE categories
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE categories
ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE;

ALTER TABLE categories
ADD COLUMN IF NOT EXISTS is_default BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE categories
DROP CONSTRAINT IF EXISTS categories_name_key;

INSERT INTO categories (name, type, user_id, parent_id, is_default)
SELECT 'Salary', 'income', NULL, NULL, TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name = 'Salary' AND type = 'income' AND is_default = TRUE
);

INSERT INTO categories (name, type, user_id, parent_id, is_default)
SELECT 'Freelance', 'income', NULL, NULL, TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name = 'Freelance' AND type = 'income' AND is_default = TRUE
);

INSERT INTO categories (name, type, user_id, parent_id, is_default)
SELECT 'Rent', 'expense', NULL, NULL, TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name = 'Rent' AND type = 'expense' AND is_default = TRUE
);

INSERT INTO categories (name, type, user_id, parent_id, is_default)
SELECT 'Groceries', 'expense', NULL, NULL, TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name = 'Groceries' AND type = 'expense' AND is_default = TRUE
);

INSERT INTO categories (name, type, user_id, parent_id, is_default)
SELECT 'Utilities', 'expense', NULL, NULL, TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name = 'Utilities' AND type = 'expense' AND is_default = TRUE
);