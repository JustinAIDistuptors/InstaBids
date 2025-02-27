# InstaBids TypeScript SDK

This TypeScript SDK provides a comprehensive set of tools and utilities for interacting with the InstaBids platform. It includes APIs for connecting to the InstaBids services, managing bids, handling user authentication, and interacting with smart contracts on the Solana blockchain.

## Features

- **Authentication**: User login, registration, and session management
- **Profile Management**: User and vendor profile operations
- **Bid Operations**: Create, retrieve, and manage bids
- **Project Management**: Create and track projects, milestones, and deliverables
- **Payment Processing**: Handle escrow payments and milestone-based fund releases
- **Smart Contract Interaction**: Direct integration with InstaBids smart contracts
- **Wallet Integration**: Connect with Solana wallets like Phantom
- **Notification System**: Subscribe to real-time updates and notifications

## Installation

```bash
npm install @instabids/sdk
```

## Quick Start

```typescript
import { InstaBidsClient } from '@instabids/sdk';

// Initialize the client
const client = new InstaBidsClient({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'development'
});

// Authenticate a user
await client.auth.login({
  email: 'user@example.com',
  password: 'secure_password'
});

// Create a new project
const project = await client.projects.create({
  title: 'My Project',
  description: 'Project description',
  budget: 500,
  deadline: new Date('2025-12-31')
});

// Submit a bid
const bid = await client.bids.create({
  projectId: project.id,
  amount: 450,
  deliveryDate: new Date('2025-12-15'),
  proposal: 'My proposal details...'
});
```

## Documentation

For full API documentation, examples, and guides, please refer to the [official documentation](https://docs.instabids.com).

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for details.

## License

This SDK is licensed under the MIT License - see the LICENSE file for details.
