import * as React from 'react';
import { FormContext } from '@context/FormContext';
import { HostContext } from '@context/Host';
import { CleanUp } from '../components';
import axios from 'axios';

const Form = () => {
  const {
    formContext,
    setFormContext,
    performCleanUp,
    setPerformCleanUp,
    setFormData,
  } = React.useContext(FormContext);
  // const { myFormData } = React.useContext(FormContext);
  const { host } = React.useContext(HostContext);
  // TODO: this isn't required in my opinion, *** not a bug ***
  const formFields = {
    fromRow: formContext?.fromRow,
    toRow: formContext?.toRow,
    batchLength: formContext?.batchLength,
    promptContext: formContext?.promptContext,
    promptQuestion: formContext?.promptQuestion,
    csvFile: formContext?.csvFile,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    try {
      const formData = new FormData(e.currentTarget);
      
      /*myFormData!.append('fromRow', formContext!.fromRow);
      myFormData!.append('toRow', formContext!.toRow);
      myFormData!.append('batchLength', formContext!.batchLength);
      myFormData!.append('promptContext', formContext!.promptContext);
      myFormData!.append('promptQuestion', formContext!.promptQuestion);
      myFormData!.append('csvFile', formContext!.csvFile, 'input.csv');*/
      
      setFormData!(formData);

      console.log(formData);

      try {
        const canContinueResponse = await axios.get(`${host}/can_continue`);
        if (canContinueResponse.data.status === 'can continue') {
          console.log('can continue');
          setPerformCleanUp!(true);
        } else {
          console.log('cannot continue');
          setPerformCleanUp!(false);
        }
      } catch (error) {
        console.error('Error occurred while fetching can_continue:', error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1>Inputs</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          From Row:
          <input
            name="fromRow"
            type="number"
            placeholder="From Row"
            value={formContext?.fromRow}
            onChange={e =>
              setFormContext &&
              setFormContext({
                ...formFields,
                fromRow: parseInt(e.target.value),
              })
            }
          />
        </label>
        <br />
        <label>
          To Row:
          <input
            name="toRow"
            type="number"
            placeholder="To Row"
            value={formContext?.toRow}
            onChange={e =>
              setFormContext &&
              setFormContext({ ...formFields, toRow: parseInt(e.target.value) })
            }
          />
        </label>
        <br />
        <label>
          Batch Length:
          <input
            name="batchLength"
            type="number"
            placeholder="Batch Length"
            value={formContext?.batchLength}
            onChange={e =>
              setFormContext &&
              setFormContext({
                ...formFields,
                batchLength: parseInt(e.target.value),
              })
            }
          />
        </label>
        <br />
        <label>
          Prompt Context:
          <textarea
            name="promptContext"
            placeholder="Prompt Context"
            value={formContext?.promptContext}
            onChange={e =>
              setFormContext &&
              setFormContext({ ...formFields, promptContext: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Prompt Question:
          <textarea
            name="promptQuestion"
            placeholder="Prompt Question"
            value={formContext?.promptQuestion}
            onChange={e =>
              setFormContext &&
              setFormContext({ ...formFields, promptQuestion: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          File:
          <input
            name="csvFile"
            type="file"
            onChange={e =>
              setFormContext &&
              setFormContext({ ...formFields, csvFile: e.target.files![0] })
            }
          />
        </label>
        <br />
        {performCleanUp && <CleanUp value="no" label="No" />}
        <button disabled={!formContext?.csvFile} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
