-- Database schema for Reliability motor and pump health monitoring application

-- Table: companies
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  address TEXT,
  contact_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'technician', 'customer')),
  company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: equipment
CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: motor_health_data
CREATE TABLE motor_health_data (
  id SERIAL PRIMARY KEY,
  equipment_id INTEGER REFERENCES equipment(id) ON DELETE CASCADE,
  parameter_data JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default company
INSERT INTO companies (name, address, contact_email)
VALUES ('Default Company', '123 Default St', 'contact@defaultcompany.com')
ON CONFLICT (name) DO NOTHING;

-- Insert default users with password hash placeholders (replace with actual bcrypt hashes)
INSERT INTO users (username, email, password_hash, role, company_id)
VALUES
  ('admin', 'admin@default.com', '$2b$10$examplehashadmin', 'admin', NULL),
  ('sagar_technician', 'sagar_tech@default.com', '$2b$10$examplehashtech', 'technician', (SELECT id FROM companies WHERE name = 'Default Company')),
  ('sagar_customer', 'sagar_customer@default.com', '$2b$10$examplehashcust', 'customer', (SELECT id FROM companies WHERE name = 'Default Company'))
ON CONFLICT (email) DO NOTHING;

-- Note: Replace the password_hash values with actual bcrypt hashes of the password 'sagar' before running.

-- Additional tables (parameters, mcsa_reports, etc.) can be added similarly based on Sequelize models.
