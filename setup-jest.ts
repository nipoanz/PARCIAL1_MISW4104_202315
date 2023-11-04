import 'jest-preset-angular/setup-jest';

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

// Object.defineProperty(document, 'doctype', {
//   value: '<!DOCTYPE html>'
// });

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

// Object.defineProperty(document.body.style, 'transform', {
//   value: () => {
//     return {
//       enumerable: true,
//       configurable: true,
//     };
//   },
// });

// Object.defineProperty(window, 'MediaRecorder', {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//       start: jest.fn(),
//       ondataavailable: jest.fn(),
//       onerror: jest.fn(),
//       state: '',
//       stop: jest.fn()
//   }))
// });

// Object.defineProperty(MediaRecorder, 'isTypeSupported', {
//   writable: true,
//   value: () => true
// });

// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });

// Object.defineProperty(window, 'MediaDeviceInfo', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     label: jest.fn(),
//     kind: jest.fn(),
//     groupId: jest.fn(),
//     deviceId: jest.fn(),
//     getUserMedia: jest.fn(),
//   })),
// });

// Object.defineProperty(global.navigator, 'mediaDevices', {
//   value: {
//       getUserMedia: jest.fn(async () => {
//         return new Promise<void>(resolve => {
//             resolve()
//         })
//     }),
//   },
// })

// Object.defineProperty(window, 'mediaDevices.getUserMedia', {
//   value: jest.fn().mockImplementation(() =>
//   Promise.resolve(
//       "stream"
//   ))
// });