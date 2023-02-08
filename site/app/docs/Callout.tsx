import cx from 'classnames';
import Icon from './Icon';

const styles = {
  note: {
    title: `text-violet-400`,
    body: `[--tw-prose-background:theme(colors.violet.50)] prose-a:text-violet-900 text-slate-300 prose-code:text-slate-300 prose-strong:text-white prose-em:text-slate-100`,
  },
  warning: {
    title: `text-amber-500`,
    body: `[--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-strong:text-white prose-em:font-medium prose-em:text-slate-200 text-slate-300 [--tw-prose-underline:theme(colors.violet.700)] prose-code:text-slate-300`,
  },
};

const icons = {
  note: (props: { className?: string }) => (
    <Icon color="blue" icon="lightbulb" {...props} />
  ),
  warning: (props: { className?: string }) => (
    <Icon color="amber" icon="warning" {...props} />
  ),
};

interface Props {
  type: 'note' | 'warning';
  alt?: boolean;
  title?: string;
  children: React.ReactNode;
}

const Callout: React.FC<Props> = ({ type, title, children, alt }) => {
  const IconComponent = icons[type];
  return (
    <span
      className={cx(
        `my-8 flex rounded-3xl p-6 ring-1 ring-slate-300/10`,
        alt ? `bg-slate-900/40` : `bg-slate-800/60`,
      )}
    >
      <IconComponent className="h-8 w-8 flex-none" />
      <span className="ml-4 flex-auto">
        {title && (
          <span
            className={cx(`font-lexend m-0 block text-xl mb-2.5`, styles[type].title)}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <span className={cx(`prose *mt-2.5 block`, styles[type].body)}>{children}</span>
      </span>
    </span>
  );
};

export default Callout;
