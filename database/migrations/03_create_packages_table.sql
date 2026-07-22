-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  sender_id UUID NOT NULL REFERENCES customers(id),
  sender_name VARCHAR(255) NOT NULL,
  recipient_id UUID NOT NULL REFERENCES customers(id),
  recipient_name VARCHAR(255) NOT NULL,
  package_nature VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  weight DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  declared_value DECIMAL(12, 2) NOT NULL,
  transport_price DECIMAL(12, 2) NOT NULL,
  insurance BOOLEAN DEFAULT false,
  departure_city VARCHAR(100) NOT NULL,
  arrival_city VARCHAR(100) NOT NULL,
  observations TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'pending', 'loading', 'transit', 'arrived', 'delivered', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_packages_tracking_number ON packages(tracking_number);
CREATE INDEX IF NOT EXISTS idx_packages_sender_id ON packages(sender_id);
CREATE INDEX IF NOT EXISTS idx_packages_recipient_id ON packages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);
CREATE INDEX IF NOT EXISTS idx_packages_departure_city ON packages(departure_city);
CREATE INDEX IF NOT EXISTS idx_packages_arrival_city ON packages(arrival_city);
CREATE INDEX IF NOT EXISTS idx_packages_created_at ON packages(created_at);
