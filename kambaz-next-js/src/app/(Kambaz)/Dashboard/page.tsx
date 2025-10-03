import Link from "next/link";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS1234 React JS
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title" style={{ height: "53px" }}>
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/2345/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/cs-fundamentals.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS2500 Fundamentals of CS
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title" style={{ height: "53px" }}>
                    Problem Solving & Program Design
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/3456/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/databases.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS3200 Database Design
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title" style={{ height: "53px" }}>
                    SQL • Schema • Transactions
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/4567/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/networks.jpeg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS3700 Networks
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title" style={{ height: "53px" }}>
                    TCP/IP • Routing • Reliability
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/5678/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/ai.jpeg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS4100 AI Foundations
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title" style={{ height: "53px" }}>
                    Search • Logic • Planning
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/6789/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/webdev.png" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS4550 Web Development
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title" style={{ height: "53px" }}>
                    Next.js • APIs • Deployment
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/7890/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/machine-learning.jpeg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    DS4400 Machine Learning
                  </CardTitle>
                  <CardText className="wd-dashboard-course-title" style={{ height: "53px" }}>
                    Supervised • Unsupervised • Eval
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}