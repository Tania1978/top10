import React from "react";
import { Card, Button } from "react-bootstrap";

const Comment = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="secondary">Add comment</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
