-- Todoテーブル作成
CREATE TABLE IF NOT EXISTS todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- サンプルデータ
INSERT INTO todos (title, completed, created_at, updated_at) VALUES
('Spring Bootの基礎を学ぶ', false, NOW(), NOW()),
('REST APIを実装する', false, NOW(), NOW()),
('Next.jsでフロントエンドを作る', false, NOW(), NOW());
