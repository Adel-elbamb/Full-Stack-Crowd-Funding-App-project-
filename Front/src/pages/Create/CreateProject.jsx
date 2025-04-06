import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import axios from "axios";
import styles from './CreateProject.module.css';

const CreateProject = () => {
  const [project, setProject] = useState({
    title: "",
    details: "",
    total_target: "",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!project.title) formErrors.title = "Title is required.";
    if (!project.details) formErrors.details = "Details are required.";
    if (!project.total_target || project.total_target <= 0) formErrors.total_target = "Target must be greater than 0.";
    if (!project.start_date) formErrors.start_date = "Start date is required.";
    if (!project.end_date) formErrors.end_date = "End date is required.";
    if (project.start_date && project.end_date && project.start_date > project.end_date) {
      formErrors.date = "Start date cannot be after end date.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/projects/", project, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("🎉 Project Created Successfully!");
    } catch (error) {
      setApiError("🚨 Error: " + (error.response?.data?.detail || "Something went wrong."));
    }
  };

  return (
    <div className={`${styles.pageBg} ${styles.fadeIn}`}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className={`${styles.glassCard} p-5`}>
              <h2 className={`text-center mb-4 ${styles.title}`}>Launch Your Project</h2>

              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {apiError && <Alert variant="danger">{apiError}</Alert>}

              <Form onSubmit={handleSubmit}>
                {[ 
                  { name: "title", label: "Project Title" },
                  { name: "details", label: "Project Details", type: "textarea" },
                  { name: "total_target", label: "Target Amount (EGP)", type: "number" },
                  { name: "start_date", label: "Start Date", type: "date" },
                  { name: "end_date", label: "End Date", type: "date" },
                ].map((field, i) => (
                  <Form.Group
                    className={`mb-3 ${styles.fadeIn}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                    key={field.name}
                  >
                    <Form.Label className={styles.formLabelCustom}>{field.label}</Form.Label>
                    <Form.Control
                      as={field.type === "textarea" ? "textarea" : "input"}
                      rows={field.type === "textarea" ? 3 : undefined}
                      type={field.type || "text"}
                      name={field.name}
                      value={project[field.name]}
                      onChange={handleChange}
                      isInvalid={!!errors[field.name]}
                      className={styles.formControlCustom}
                    />
                    <Form.Control.Feedback type="invalid">{errors[field.name]}</Form.Control.Feedback>
                  </Form.Group>
                ))}

                {errors.date && <Alert variant="danger">{errors.date}</Alert>}

                <div className="d-grid mt-4">
                  <Button type="submit" className={styles.btnGlow} size="lg">
                    Create Project
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateProject;
