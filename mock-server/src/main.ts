import express from 'express';

const app = express();
app.use(express.json());

// In-memory Database
let inventory = [
  { id: 'INV-1001', name: 'ThinkPad X1 Carbon Gen 11', sku: 'LAP-TP-X1G11', category: 'Electronics', quantity: 15, price: 1499.99, status: 'In Stock' },
  { id: 'INV-1002', name: 'Dell UltraSharp 27 Monitor', sku: 'MON-DELL-U27', category: 'Electronics', quantity: 42, price: 349.99, status: 'In Stock' },
  { id: 'INV-1003', name: 'Ergonomic Mesh Office Chair', sku: 'FURN-CHR-ERG', category: 'Furniture', quantity: 3, price: 249.50, status: 'Low Stock' },
  { id: 'INV-1004', name: 'Mechanical Keyboard (Cherry MX Brown)', sku: 'PER-KB-MECH-BR', category: 'Peripherals', quantity: 0, price: 129.00, status: 'Out of Stock' },
  { id: 'INV-1005', name: 'Logitech MX Master 3S Wireless Mouse', sku: 'PER-MOU-MX3S', category: 'Peripherals', quantity: 28, price: 99.99, status: 'In Stock' },
  { id: 'INV-1006', name: 'Standing Desk - Dual Motor', sku: 'FURN-DSK-STD', category: 'Furniture', quantity: 12, price: 499.00, status: 'In Stock' },
  { id: 'INV-1007', name: 'Noise Cancelling Headphones (Sony WH-1000XM5)', sku: 'AUD-HP-SNYXM5', category: 'Electronics', quantity: 5, price: 398.00, status: 'Low Stock' },
  { id: 'INV-1008', name: 'USB-C Hub (7-in-1)', sku: 'ACC-USB-HUB7', category: 'Accessories', quantity: 115, price: 35.99, status: 'In Stock' },
  { id: 'INV-1009', name: 'Webcam 4K Pro', sku: 'PER-CAM-4K', category: 'Peripherals', quantity: 0, price: 199.99, status: 'Out of Stock' },
  { id: 'INV-1010', name: 'Surge Protector Power Strip', sku: 'ACC-PWR-STRIP', category: 'Accessories', quantity: 87, price: 19.50, status: 'In Stock' }
];

// Helper to calculate status based on quantity
function calculateStatus(quantity: number) {
  if (quantity === 0) return 'Out of Stock';
  if (quantity < 10) return 'Low Stock';
  return 'In Stock';
}

// Routes
app.get('/api/inventory', (req, res) => {
  res.json(inventory);
});

app.get('/api/inventory/:id', (req, res) => {
  const item = inventory.find(i => i.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/api/inventory', (req, res) => {
  const newItem = {
    ...req.body,
    id: `INV-${1000 + inventory.length + 1}`,
    status: calculateStatus(req.body.quantity)
  };
  inventory.unshift(newItem);
  res.status(201).json(newItem);
});

app.put('/api/inventory/:id', (req, res) => {
  const index = inventory.findIndex(i => i.id === req.params.id);
  if (index !== -1) {
    inventory[index] = { 
      ...inventory[index], 
      ...req.body,
      status: calculateStatus(req.body.quantity ?? inventory[index].quantity)
    };
    res.json(inventory[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/api/inventory/:id', (req, res) => {
  const index = inventory.findIndex(i => i.id === req.params.id);
  if (index !== -1) {
    const deleted = inventory.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
