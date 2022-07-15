import { Card, CardBody } from "reactstrap";

export const Comment = ({ comment }) => {
    return (
        <Card>
            <CardBody>
                <h4>{comment.subject}</h4>
                <p>{comment.content}</p>
                <br/>
                <p><b>{comment.userProfile.displayName}</b> made this comment on {comment.createDateTime}</p>
            </CardBody>
        </Card>
    )
}