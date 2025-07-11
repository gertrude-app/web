import { DarkMode, Gradient, LightMode } from '../Icon';

interface Props {
  id: string;
  color: `blue` | `amber`;
}

const InstallationIcon: React.FC<Props> = ({ id, color }) => (
  <>
    <defs>
      <Gradient
        id={`${id}-gradient`}
        color={color}
        gradientTransform="matrix(0 21 -21 0 12 3)"
      />
      <Gradient
        id={`${id}-gradient-dark`}
        color={color}
        gradientTransform="matrix(0 21 -21 0 16 7)"
      />
    </defs>
    <LightMode>
      <circle cx={12} cy={12} r={12} fill={`url(#${id}-gradient)`} />
      <path
        d="m8 8 9 21 2-10 10-2L8 8Z"
        fillOpacity={0.5}
        className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </LightMode>
    <DarkMode>
      <path
        d="m4 4 10.286 24 2.285-11.429L28 14.286 4 4Z"
        fill={`url(#${id}-gradient-dark)`}
        stroke={`url(#${id}-gradient-dark)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </DarkMode>
  </>
);

export default InstallationIcon;
