import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from './__mocks__/Server';
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd()
loadEnvConfig(projectDir)

beforeAll(() => {
  vi.mock("next/router", () => require('next-router-mock'));
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));