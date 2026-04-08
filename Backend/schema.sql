-- ═══════════════════════════════════════════
-- Antigravity Portfolio — PostgreSQL Schema
-- ═══════════════════════════════════════════
-- Run this script on your PostgreSQL database before starting the backend in prod mode.

-- Create the database (run separately as superuser)
-- CREATE DATABASE portfolio_db;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id              BIGSERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    subtitle        VARCHAR(255),
    description     TEXT,
    tech_stack      TEXT,
    category        VARCHAR(100) NOT NULL,
    github_url      VARCHAR(500),
    demo_url        VARCHAR(500),
    features        TEXT,
    gradient        VARCHAR(255),
    accent_color    VARCHAR(50)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    message         TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster category filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Index for contact message ordering
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contact_messages(created_at DESC);
