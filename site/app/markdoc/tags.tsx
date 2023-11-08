import ArticleFeedbackForm from 'docs/ArticleFeedbackForm';
import Callout from '../docs/Callout';
import { QuickLink, QuickLinks } from '../docs/QuickLinks';
import ArticleImage from '../docs/ArticleImage';
import ClickToReveal from '../docs/ClickToReveal';

const tags = {
  callout: {
    attributes: {
      alt: { type: Boolean },
      title: { type: String },
      type: {
        type: String,
        default: `note`,
        matches: [`note`, `warning`],
        errorLevel: `critical`,
      },
    },
    render: Callout,
  },
  image: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      caption: { type: String },
      alt: { type: String },
    },
    render: ArticleImage,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: renderFigure,
  },
  'click-to-reveal': {
    selfClosing: false,
    attributes: {
      title: { type: String },
    },
    render: ClickToReveal,
  },
  'article-feedback-form': {
    attributes: {
      name: { type: String },
      lang: {
        type: String,
        default: `en`,
        matches: [`en`, `es`],
        errorLevel: `critical`,
      },
    },
    render: ArticleFeedbackForm,
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
};

export default tags;

function renderFigure({
  src,
  alt = ``,
  caption,
}: {
  src: string;
  alt?: string;
  caption: string;
}): JSX.Element {
  return (
    <figure>
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
