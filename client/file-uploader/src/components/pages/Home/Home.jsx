import { Upload, FolderOpen, Lock } from "lucide-react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Store.
                <br />
                <span className={styles.heroTitleAccent}>Organize.</span>
                <br />
                Access.
              </h1>
              <p className={styles.heroDescription}>
                Your files, everywhere. Simple cloud storage that works the way
                you do.
              </p>
            </div>

            {/* Geometric Shapes */}
            <div className={styles.geometricShapes}>
              <div className={styles.shapeCircle} />
              <div className={styles.shapeSquare} />
              <div className={styles.shapeRectangle} />
              <div className={styles.shapeOutline} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.featuresTitle}>Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={`${styles.featureIcon} ${styles.featureIconRed}`}>
                <Upload />
              </div>
              <h3 className={styles.featureTitle}>Upload</h3>
              <p className={styles.featureDescription}>
                Drag and drop files instantly. Upload documents, images, videos,
                and more.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div
                className={`${styles.featureIcon} ${styles.featureIconYellow}`}
              >
                <FolderOpen />
              </div>
              <h3 className={styles.featureTitle}>Organize</h3>
              <p className={styles.featureDescription}>
                Create folders and keep everything structured your way.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div
                className={`${styles.featureIcon} ${styles.featureIconBlue}`}
              >
                <Lock />
              </div>
              <h3 className={styles.featureTitle}>Secure</h3>
              <p className={styles.featureDescription}>
                Your data is encrypted and protected. Access from any device,
                anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className={styles.disclaimerSection}>
        <div className={styles.container}>
          <div className={styles.disclaimerContent}>
            <p className={styles.disclaimerTitle}>Important Notice</p>
            <p className={styles.disclaimerText}>
              This is a personal project with limited resources, created for
              demonstration purposes only. Uploaded files may be deleted after a
              period of time. Please do not upload sensitive or important data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
