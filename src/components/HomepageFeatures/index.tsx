import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Swift',
    Svg: require('@site/static/img/swift-1.svg').default,
    description: (
      <>
        Swift es un lenguaje de programación multiparadigma creado por Apple enfocado en el desarrollo de aplicaciones para iOS y macOS.
        Fue presentado en la WWDC 2014​ y está diseñado para integrarse con los Frameworks Cocoa y Cocoa Touch.
      </>
    ),
  },
  {
    title: 'Xcode',
    Svg: require('@site/static/img/xcode.svg').default,
    description: (
      <>
        Xcode es un entorno de desarrollo integrado para macOS que contiene un conjunto de herramientas
        creadas por Apple destinadas al desarrollo de software para macOS, iOS, watchOS y tvOS.
      </>
    ),
  },
  {
    title: 'iOS',
    Svg: require('@site/static/img/ios-1.svg').default,
    description: (
      <>
        iOS es un sistema operativo móvil de código cerrado desarrollado por Apple Inc.
        Originalmente desarrollado para el iPhone, después se utilizó en dispositivos como el iPod touch y el iPad.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
