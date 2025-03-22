// @refresh reload
import { mount, StartClientTanstack } from '@solidjs/start/client';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
mount(() => <StartClientTanstack />, document.getElementById(`app`)!);
