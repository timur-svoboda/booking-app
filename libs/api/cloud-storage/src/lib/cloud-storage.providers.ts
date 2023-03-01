import { Storage } from '@google-cloud/storage';
import { STORAGE } from './cloud-storage.constants';

const storage = new Storage();

export const cloudStorageProvider = {
  provide: STORAGE,
  useValue: storage,
};

export default cloudStorageProvider;
