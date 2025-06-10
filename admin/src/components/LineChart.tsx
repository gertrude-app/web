import { type Component, createEffect, createSignal } from 'solid-js';
import cx from 'clsx';

interface DataPoint {
  value: number;
  label: string;
}

interface Props {
  class?: string;
  data: DataPoint[];
}

const LineChart: Component<Props> = (props) => {
  let max = props.data.reduce(
    (acc, curr) => (curr.value > acc ? curr.value : acc),
    -Infinity,
  );
  let min = props.data.reduce((acc, curr) => (curr.value < acc ? curr.value : acc), max);

  let width = props.data.length - 1;
  let height = max - min;

  let svgContainer!: HTMLDivElement;
  let [containerWidth, setContainerWidth] = createSignal(0);
  let [containerHeight, setContainerHeight] = createSignal(0);

  function convertX(value: number) {
    return (value / width) * containerWidth();
  }
  function convertY(value: number) {
    return (value / height) * containerHeight();
  }

  createEffect(() => {
    setContainerWidth(svgContainer.getBoundingClientRect().width);
    setContainerHeight(svgContainer.getBoundingClientRect().height);
  });

  return (
    <div class={cx('w-full h-full flex flex-col', props.class)}>
      <div class="flex-grow flex shrink-0">
        {/* numbers on left side */}
        <div class="flex flex-col">
          <div class="h-4" />
          <div class="w-10 relative flex-grow">
            {stepsBetween(min, max).map((step) => (
              <span
                class="w-0 h-0 flex justify-end items-center text-[10px] absolute right-2 text-black/30"
                style={{ top: `${((step - max) * 100) / -height}%` }}
              >
                {step}
              </span>
            ))}
          </div>
          <div class="h-4" />
        </div>

        {/* main container */}
        <div class="flex-grow flex flex-col relative overflow-hidden rounded-2xl shadow-inner shadow-violet-800/7">
          {/* vertical lines */}
          {props.data.map((_, index) => (
            <div
              class={cx(
                'h-[calc(100%-16px)] w-0.5 top-0 bg-violet-900/6 absolute',
                (index === 0 || index === props.data.length - 1) && `opacity-0`,
              )}
              style={{
                left: `calc(${(index * 100) / (props.data.length - 1)}% - 1px)`,
              }}
            />
          ))}

          {/* top padding */}
          <div class="h-4 bg-violet-500/7 rounded-t-2xl" />

          {/* graph */}
          <div class="flex-grow relative bg-violet-500/7" ref={svgContainer}>
            <svg
              class="overflow-visible"
              preserveAspectRatio="none"
              width={`${containerWidth()}px`}
              height={`${containerHeight()}px`}
              viewBox={`0 0 ${containerWidth()} ${containerHeight()}`}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#8b5cf6" />
                  <stop offset="100%" stop-color="#c4b5fd" />
                </linearGradient>
              </defs>
              <path
                d={[
                  `M 0 ${convertY(max - (props.data[0]?.value ?? 0))}`,
                  ...props.data
                    .slice(1)
                    .map(
                      (_, index) =>
                        `c ${convertX(0.4)} ${0} ${convertX(0.5)} ${convertY(
                          (props.data[index]?.value ?? 0) -
                            (props.data[index + 1]?.value ?? 0),
                        )} ${convertX(1)} ${convertY(
                          (props.data[index]?.value ?? 0) -
                            (props.data[index + 1]?.value ?? 0),
                        )}`,
                    ),
                  `L ${containerWidth()} ${containerHeight()}`,
                  `L 0 ${containerHeight()}`,
                  `Z`,
                ].join('\n')}
                fill="url(#chartGradient)"
              />
            </svg>
          </div>

          {/* bottom padding */}
          <div class="h-4 bg-violet-300 rounded-b-2xl" />

          {/* hover regions */}
          {props.data.map((_, index) => (
            <div
              class="h-full top-0 absolute flex justify-center group"
              style={{
                left: `calc(${
                  (index * 100) / (props.data.length - 1) - 50 / (props.data.length - 1)
                }% - 1px)`,
                width: `${100 / (props.data.length - 1)}%`,
              }}
            >
              <div class="w-1 h-full bg-violet-900/30 group-hover:opacity-100 opacity-0 transition-opacity duration-100" />
            </div>
          ))}
        </div>
      </div>
      {/* bottom labels */}
      <div class="h-12 flex shrink-0">
        <div class="w-12"></div>
        <div class="flex-grow flex justify-between">
          {props.data.map(({ label }) => (
            <span class="-rotate-[60deg] w-0 h-0 flex justify-end whitespace-nowrap text-xs translate-y-1 -translate-x-2 text-black/40 font-medium">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineChart;

function stepsBetween(min: number, max: number): number[] {
  const range = max - min;

  const stepSize = (() => {
    switch (true) {
      case range < 6:
        return 1;
      case range < 15:
        return 2;
      case range < 35:
        return 5;
      case range < 75:
        return 10;
      case range < 150:
        return 20;
      case range < 350:
        return 50;
      case range < 750:
        return 100;
      case range < 1500:
        return 200;
      default:
        return 500;
    }
  })();

  const steps = [];
  for (let i = min; i <= max; i += 1) {
    if (i % stepSize === 0) {
      steps.push(i);
    }
  }

  return steps;
}
