import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h2>Assignment Name</h2>
      <label htmlFor="wd-name"> </label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />

      <textarea id="wd-description" rows={6} cols={80} defaultValue={
        `The assignment is available online Submit a link to the landing page of your Web
        application running on Netlify. The landing page should include the following:
        Your full name and section
        Links to each of the lab assignments
        Link to the Kanbaz application
        Links to all relevant source code repositories
        The Kanbaz application should include a link to navigate back to the landing page.`
      } />
      <br />

      <table>
        <tbody>
          {/* Points */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          {/* Assignment Group */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>

          {/* Display Grade as */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
                <option>Letter Grade</option>
              </select>
            </td>
          </tr>

          {/* Submission Type */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </select>

              <div style={{ marginTop: 10 }}>
                <div><b>Online Entry Options</b></div>
                <div>
                  <input id="wd-text-entry" type="checkbox" />
                  <label htmlFor="wd-text-entry" style={{ marginLeft: 6 }}>
                    Text Entry
                  </label>
                </div>
                <div>
                  <input id="wd-website-url" type="checkbox" />
                  <label htmlFor="wd-website-url" style={{ marginLeft: 6 }}>
                    Website URL
                  </label>
                </div>
                <div>
                  <input id="wd-media-recordings" type="checkbox" />
                  <label htmlFor="wd-media-recordings" style={{ marginLeft: 6 }}>
                    Media Recordings
                  </label>
                </div>
                <div>
                  <input id="wd-student-annotation" type="checkbox" />
                  <label htmlFor="wd-student-annotation" style={{ marginLeft: 6 }}>
                    Student Annotation
                  </label>
                </div>
                <div>
                  <input id="wd-file-upload" type="checkbox" />
                  <label htmlFor="wd-file-upload" style={{ marginLeft: 6 }}>
                    File Uploads
                  </label>
                </div>
              </div>
            </td>
          </tr>

          {/* Assign to */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          {/* Due */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
            </td>
          </tr>

          {/* Available from / until */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
              
              <label htmlFor="wd-available-until">Until</label>
              &nbsp;
              <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <div>
        <Link href={`/Courses/1234/Assignments`}>
          <button>Cancel</button>
        </Link>
        &nbsp;&nbsp;
        <button>Save</button>
      </div>
    </div>
  );
}
