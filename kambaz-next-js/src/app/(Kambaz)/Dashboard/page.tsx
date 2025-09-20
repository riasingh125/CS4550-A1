import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" alt="ReactJS course thumbnail" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2345" className="wd-dashboard-course-link">
            <Image src="/images/cs-fundamentals.png" alt="c course thumbnail" width={200} height={150} />
            <div>
              <h5> CS2500 Fundamentals of CS </h5>
              <p className="wd-dashboard-course-title">
                Problem Solving & Program Design
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/databases.png" alt="Database Design course thumbnail" width={200} height={150} />
            <div>
              <h5> CS3200 Database Design </h5>
              <p className="wd-dashboard-course-title">
                SQL • Schema • Transactions
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4567" className="wd-dashboard-course-link">
            <Image src="/images/networks.jpeg" alt="Networks course thumbnail" width={200} height={150} />
            <div>
              <h5> CS3700 Networks </h5>
              <p className="wd-dashboard-course-title">
                TCP/IP • Routing • Reliability
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/ai.jpeg" alt="AI course thumbnail" width={200} height={150} />
            <div>
              <h5> CS4100 AI Foundations </h5>
              <p className="wd-dashboard-course-title">
                Search • Logic • Planning
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/6789" className="wd-dashboard-course-link">
            <Image src="/images/webdev.png" alt="Web Development course thumbnail" width={200} height={150} />
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Next.js • APIs • Deployment
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/7890" className="wd-dashboard-course-link">
            <Image src="/images/machine-learning.jpeg" alt="Machine Learning course thumbnail" width={200} height={150} />
            <div>
              <h5> DS4400 Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                Supervised • Unsupervised • Eval
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
