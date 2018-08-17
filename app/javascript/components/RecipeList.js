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
import RecipeListItem from './RecipeListItem';
import RecipeForm from './RecipeForm';
import 'whatwg-fetch';

class RecipeList extends React.Component {
    state = {
        data: [],
        form: {
            title: '',
            submitTitle: '',
            open: false,
            model: true,
            values: {
                name: '',
                description: '',
                cooking: ''
            }
        }
    };

    static get INDEX_ROUTE() {
        return '/recipes';
    }

    static get CREATE_ROUTE() {
        return RecipeList.INDEX_ROUTE;
    }

    static ENTITY_ROUTE(id) {
        return RecipeList.INDEX_ROUTE + '/' + id;
    }

    constructor(props) {
        super(props);
        this.getRecipes();
    }

    getRecipes = () => {
        return fetch(RecipeList.INDEX_ROUTE)
            .then(response => response.json())
            .then((response) => {
                var data = response.reduce((acc, val) => {
                    val.visible = false;
                    acc[val.id] = val;
                    return acc;
                }, {});

                this.setState({data: data});
            });
    }

    createRecipe = (values) => {
        return fetch(RecipeList.CREATE_ROUTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(x => x.json()).then((x) => {
            var data = this.state.data;
            x.visible = false;
            data[x.id] = x;
            this.setState({data: data});
        });
    }

    updateRecipe = (id, values) => {
        delete values.id;

        return fetch(RecipeList.ENTITY_ROUTE(id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then((x) => x.json()).then((x) => {
            var data = this.state.data;
            x.visible = data[id].visible;
            data[id] = x;
            this.setState({data: data});
        });
    }

    destroyRecipe = (id) => {
        return fetch(RecipeList.ENTITY_ROUTE(id), {
            method: 'DELETE'
        }).then((x) => {
            var data = this.state.data;
            delete data[id];
            this.setState({data: data});
        });
    }

    resetForm = (open, title = '', submitTitle = '', model = false) => {
        var values = {name: '', description: '', cooking: ''};

        if(model)
            values = {id: model.id, name: model.name, description: model.description, cooking: model.cooking};

        this.setState({form: {
            open: open,
            isModel: !!model,
            values: values,
            submitTitle: submitTitle,
            title: title
        }});
    }

    onAdd = (e) => {
        this.resetForm(true, 'Create Recipe', 'Create');
    }

    onJson = (e) => {
        window.open(RecipeList.INDEX_ROUTE);
    }

    onEdit = (e, key) => {
        this.resetForm(true, 'Edit Recipe', 'Save', this.state.data[key]);
    }

    onDestroy = (e, key) => {
        this.destroyRecipe(key);
    }

    onToggle = (e, key) => {
        var data = this.state.data;
        var newVisibility = !data[key].visible;

        Object.keys(this.state.data).forEach((x) => data[x].visible = false);
        data[key].visible = newVisibility;
        this.setState({data: data});

        e.preventDefault();
    }

    onFormClose = (e) => {
        this.resetForm(false);
    }

    onFormSubmit = (e) => {
        if(this.state.form.isModel)
            this.updateRecipe(this.state.form.values.id, this.state.form.values).then((x) => this.resetForm(false));
        else
            this.createRecipe(this.state.form.values).then((x) => this.resetForm(false));
    }

    onFormChange = (e) => {
        var form = this.state.form;
        form.values[e.target.name] = e.target.value;
        this.setState({form: form});
    }

    render() {
        return (
            <React.Fragment>
              <div className="d-flex">
                <h2 className="mr-auto pb-1">Recipes</h2>
                <UncontrolledDropdown>
                  <DropdownToggle tag="a" caret>
                    Actions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.onAdd}>Create</DropdownItem>
                    <DropdownItem onClick={this.onJson}>JSON</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              {Object.keys(this.state.data).map((key) => {
                  return (
                      <RecipeListItem key={key} model={this.state.data[key]} onToggle={this.onToggle} onEdit={this.onEdit} onDestroy={this.onDestroy}/>
                  );
              })}
              <Modal isOpen={this.state.form.open} size="lg">
                <RecipeForm values={this.state.form.values} submitTitle={this.state.form.submitTitle} title={this.state.form.title}
            onSubmit={this.onFormSubmit} onClose={this.onFormClose} onChange={this.onFormChange}/>
              </Modal>
            </React.Fragment>
        );
    }
}

export default RecipeList;
