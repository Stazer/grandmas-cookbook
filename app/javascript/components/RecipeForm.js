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

class RecipeForm extends React.Component {
    onChange = (e) => {
    }

    render() {
        return (
            <React.Fragment>
              <Form>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" value={this.props.values.name} onChange={this.props.onChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" id="description" name="description" value={this.props.values.description} onChange={this.props.onChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="cooking">Cooking</Label>
                    <Input type="textarea" rows="10" id="cooking" name="cooking" value={this.props.values.cooking} onChange={this.props.onChange}/>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.props.onSubmit}>{this.props.submitTitle}</Button>{' '}
                  <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            </React.Fragment>
        );
    }
}

export default RecipeForm;
