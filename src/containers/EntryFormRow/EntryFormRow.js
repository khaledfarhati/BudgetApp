import React, { Component } from "react";
import Input from "../../components/Ui/Input/Input";
import Aux from "../../containers/Hoc/Auxi/Auxiliary";
import styles from "./EntryFormRow.module.css";
class EntryFormRow extends Component {
  state = {
    formData: {
      categoryId: {
        elementName: "categoryId",
        elementType: "select",
        elementConfig: {
          options: { ...this.props.categories }
        },
        value: `${
          this.props.transaction ? this.props.transaction.categoryId : ""
        }`,
        validation: {},
        valid: true
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Description"
        },

        value: `${
          this.props.transaction ? this.props.transaction.description : ""
        }`,
        validation: {},
        valid: true,
        touched: false
      },
      value: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Value"
        },
        value: `${this.props.transaction ? this.props.transaction.value : ""}`,
        validation: {
          required: true
        },
        valid: this.props.transaction,
        touched: false
      },
      id: {
        elementType: "input",
        elementConfig: {
          type: "hidden"
        },
        value: this.props.transaction ? this.props.transaction.id : "",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event, identifierElement) => {
    const updatedFormData = { ...this.state.formData };
    const updatedFormDataElm = { ...updatedFormData[identifierElement] };
    updatedFormDataElm.value = event.target.value;
    updatedFormDataElm.valid = this.checkValidity(
      updatedFormDataElm.value,
      updatedFormDataElm.validation
    );
    updatedFormDataElm.touched = true;
    updatedFormData[identifierElement] = updatedFormDataElm;
    let formIsValid = true;
    for (let inputIdentifier in updatedFormData) {
      formIsValid = updatedFormData[inputIdentifier].valid && formIsValid;
    }
    this.setState({ formData: updatedFormData, formIsValid });
  };
  handleDelete = id => {
    this.props.setEditTransaction("");
    this.props.deleteTransaction(id);
  };
  handleSubmit = values => {
    console.log({ ...values.value });
    const { id, description, value, categoryId } = values;
    console.log({ id, description, value, categoryId });
    console.log(values);
    console.log(!id);
    if (!id) {
      this.props.addTransaction({ id, description, value, categoryId });
    } else {
      this.props.updateTransaction({ id, description, value, categoryId });
      this.props.setEditTransaction("");
    }
  };
  submitForm = event => {
    if (event) {
      event.preventDefault();
    }
    const [fieldname1, fieldname2, fieldname3, fieldname4] = Object.keys(
      this.state.formData
    );

    const { [fieldname1]: value1 } = {
      [fieldname1]: this.state.formData[`${fieldname1}`]["value"]
    };
    const { [fieldname2]: value2 } = {
      [fieldname2]: this.state.formData[`${fieldname2}`]["value"]
    };

    const { [fieldname3]: value3 } = {
      [fieldname3]: this.state.formData[`${fieldname3}`]["value"]
    };
    const { [fieldname4]: value4 } = {
      [fieldname4]: this.state.formData[`${fieldname4}`]["value"]
    };

    const values = Object.assign(
      {},
      { [fieldname1]: value1 },
      { [fieldname2]: value2 },
      { [fieldname3]: value3 },
      { [fieldname4]: value4 }
    );

    this.handleSubmit(values);
  };
  render() {
    const { categories, transaction } = this.props;
    const id = transaction ? transaction.id : "";
    const formElementsArray = [];
    const { formData } = this.state;
    for (let key in formData) {
      formElementsArray.push({ id: key, config: formData[key] });
    }
    console.log(formElementsArray);
    console.log(this.props.categories);
    return (
      <tr className={styles.EntryRowForm}>
        <td>
          <form onSubmit={this.submitForm}>
            {formElementsArray.map((formElement, i) => (
              <Input
                key={i}
                index={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event =>
                  this.inputChangeHandler(event, formElement.id)
                }
              />
            ))}
            <div className={styles.FormSection}>
              <button
                className={[styles.Btn, styles.Primary].join(" ")}
                disabled={!this.state.formIsValid}
              >
                {!id ? "ADD" : "UPDATE"}
              </button>
              {id ? (
                <Aux>
                  <button
                    type="button"
                    onClick={() => this.props.setEditTransaction("")}
                    className={[styles.Btn, styles.Cancel].join(" ")}
                  >
                    CANCEL
                  </button>
                  <button
                    className={[styles.Btn, styles.Danger].join(" ")}
                    type="button"
                    onClick={() => this.handleDelete(id)}
                  >
                    DELETE
                  </button>
                </Aux>
              ) : null}
            </div>
          </form>
        </td>
      </tr>
    );
  }
}
export default EntryFormRow;
