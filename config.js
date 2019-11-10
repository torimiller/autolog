'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://tori-miller:k9q5C?)Q&R4tjB(4@my-first-atlas-db-ec5ld.mongodb.net/car-maintenance?retryWrites=true&w=majority';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb+srv://tori-miller:k9q5C?)Q&R4tjB(4@my-first-atlas-db-ec5ld.mongodb.net/test-car-maintenance?retryWrites=true&w=majority';
exports.PORT = process.env.PORT || 3090;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';