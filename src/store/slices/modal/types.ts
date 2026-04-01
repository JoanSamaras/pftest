export type ModalState<T = any> = {
  open: boolean;
  data: T | null;
};
