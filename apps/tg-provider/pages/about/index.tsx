import { GetStaticProps } from 'next';
import styles from './index.module.css';

/* eslint-disable-next-line */
export interface AboutProps {
  name: string;
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  console.log('context', context);
  return {
    props: {
      name: 'Yura'
    }
  };
};

export function About(props: AboutProps) {
  console.log('props', props);
  const { name } = props;

  return (
    <div className={styles['container']}>
      <h1>{`Welcome, ${name}`}</h1>
    </div>
  );
}

export default About;
