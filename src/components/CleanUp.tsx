import * as React from 'react';
import axios from 'axios';
import { HostContext } from '@context/Host';
import { FormContext } from '@context/FormContext';
import '@styles/cleanup.scss';

interface IOption {
  value: string;
  label: string;
}

type OptionType = IOption;

const CleanUp: React.FC<OptionType> = (props: OptionType) => {
  const { setPerformCleanUp, formData } = React.useContext(FormContext);
  const [selectedOption, setSelectedOption] = React.useState<string>(
    props.value
  );
  const { host } = React.useContext(HostContext);

  const postFormData = async () => {
    try {
      const uploadCsvResponse = await axios.post(
        `${host}/upload_csv`,
        formData
      );
      console.log(uploadCsvResponse.data);
    } catch (error) {
      console.error('Error occurred while uploading CSV:', error);
    }
  };

  const handlePerformCleanUp = async () => {
    const { data } = await axios.post(`${host}/cleanup`, {
      choice: selectedOption,
    });
    console.log(data);
    if (data) {
      setPerformCleanUp!(false);
      await postFormData();
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Button clicked!');
    try {
      if (selectedOption === 'yes') {
        await handlePerformCleanUp();
      } else if (selectedOption === 'no') {
        await handlePerformCleanUp();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="cleanup modal">
        <h3>Residual Files Found</h3>
        <label>CleanUp:</label>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <p>You selected: {selectedOption}</p>

        <button onClick={handleButtonClick}>
          {selectedOption === 'yes' ? 'CleanUp!' : 'Cool'}
        </button>
      </div>
    </>
  );
};

export default CleanUp;
