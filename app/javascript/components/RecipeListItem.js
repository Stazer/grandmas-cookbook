import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    UncontrolledDropdown,
} from 'reactstrap';

class RecipeListItem extends React.Component {
    render () {
        return (
            <React.Fragment>
              <Card className="mb-3">
                <CardHeader className="d-flex">
                  <a className="mr-auto" href="#" onClick={(e) => this.props.onToggle(e, this.props.model.id)}>{this.props.model.name} <span className="text-muted">{this.props.model.description}</span></a>
                  <UncontrolledDropdown>
                    <DropdownToggle tag="a" caret>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={(e) => this.props.onEdit(e, this.props.model.id)}>Edit</DropdownItem>
                      <DropdownItem onClick={(e) => this.props.onDestroy(e, this.props.model.id)}>Delete</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <Collapse isOpen={this.props.model.visible}>
                  <CardBody style={{whiteSpace: 'pre-line'}}>
                    {this.props.model.cooking}
                  </CardBody>
                </Collapse>
              </Card>
            </React.Fragment>
        );
    }
}

export default RecipeListItem;
