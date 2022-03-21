import 'antd/dist/antd.css';
import { Form, Button, InputNumber, notification, Layout } from 'antd';
import Cleave from 'cleave.js/react';
import { useState } from 'react';

function App() {
  const [form] = Form.useForm();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsSubmitDisabled(hasErrors);
  };

  const handleFinish = (values) => {
    values.CardNumber = values.CardNumber.replace(/ /g, '');
    // Можно отпарсить ExpDate для надежности хранения и пользования
    // values.ExpDate = Date.parse(cleaveDate.getISOFormatDate().slice(0, 7));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    try {
      fetch('/api/payment/create', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            notification.success({
              message: 'Payment completed!',
              description: JSON.stringify(data),
            });
            setIsSubmitDisabled(true);
          } else {
            throw new Error(data.error);
          }
        });
    } catch (error) {
      notification.error({ message: error });
    }
  };

  return (
    <Layout style={{ height: '100vh', background: 'white' }}>
      <Form
        form={form}
        name={'payment'}
        layout={'vertical'}
        onFinish={handleFinish}
        style={{ margin: '200px auto', width: '400px' }}
        className="site-layout-background"
        onFieldsChange={handleFormChange}
        hideRequiredMark
      >
        <Form.Item
          name="CardNumber"
          label="Card Number"
          rules={[
            {
              pattern: new RegExp('^[0-9]{16}$'),
              message: 'Wrong card number format.',
              transform: (value) => value.trim().replace(/ /g, ''),
            },
            { required: true, message: 'Card number is required.' },
          ]}
        >
          <Cleave
            className="ant-input"
            placeholder="XXXX XXXX XXXX XXXX"
            options={{ blocks: [4, 4, 4, 4] }}
          />
        </Form.Item>
        <Form.Item
          name="ExpDate"
          label="Expiration Date"
          rules={[
            { required: true, message: 'Expiration date is required' },
            {
              message: 'Wrong expiration date format',
              pattern: new RegExp('^0[1-9]|1[0-2]/[0-9]{4}$'),
            },
          ]}
        >
          <Cleave
            className="ant-input"
            placeholder="MM/YYYY"
            options={{ date: true, datePattern: ['m', 'Y'] }}
          />
        </Form.Item>
        <Form.Item
          name="Cvv"
          label="CVV"
          rules={[
            {
              pattern: new RegExp('^[0-9]{3}$'),
              message: 'Wrong CVV format.',
            },
            { required: true, message: 'Card number is required.' },
          ]}
        >
          <Cleave
            className="ant-input"
            placeholder="XXX"
            options={{
              numeral: true,
              stripLeadingZeroes: false,
              numeralPositiveOnly: true,
            }}
          />
        </Form.Item>
        <Form.Item
          name="Amount"
          label="Amount"
          rules={[
            { type: 'number' },
            { required: true, message: 'Payment amount is required.' },
          ]}
        >
          <InputNumber min={1} placeholder={'min: 1'} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType={'submit'}
            style={{ width: '100%' }}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default App;
