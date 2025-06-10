type ISODateString = string;

type Result<T, E> =
  | {
      case: 'ok';
      data: T;
    }
  | {
      case: 'error';
      error: E;
    };
