// jest.setup.ts
Object.defineProperty(global, 'importMeta', {
    value: {
        env: {
            VITE_APPWRITE_DATABASE_ID: 'test-db',
            VITE_APPWRITE_COLLECTION_ID_USERS: 'test-collection',
            VITE_APPWRITE_PROJECT_ID: 'test-project',
            VITE_APPWRITE_ENDPOINT: 'http://localhost',
        },
    },
});
