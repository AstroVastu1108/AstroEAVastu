// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { CreateOrder, VerifyOrder } from '@/app/Server/API/subscription'
import { useAuth } from '@/@core/contexts/authContext'
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { LoadingButton } from '@mui/lab'

import { useRouter } from 'next/navigation'
// Styles Imports
// import frontCommonStyles from '@views/front-pages/styles.module.css'
// import styles from './styles.module.css'

const pricingPlans = [
  // {
  //   title: 'Basic',
  //   img: '/images/front-pages/landing-page/pricing-basic.png',
  //   monthlyPay: 19,
  //   annualPay: 14,
  //   perYearPay: 168,
  //   features: ['Timeline', 'Basic search', 'Live chat widget', 'Email marketing', 'Custom Forms', 'Traffic analytics'],
  //   current: false
  // },
  {
    title: 'Basic',
    img: '/images/front-pages/landing-page/pricing-team.png',
    monthlyPay: 250,
    annualPay: 250,
    perYearPay: 3000,
    features: [
      'Making Kundli',
      'Manages Clients',
      'Making Tasks'
    ],
    current: true
  },
//   {
//     title: 'Enterprise',
//     img: '/images/front-pages/landing-page/pricing-enterprise.png',
//     monthlyPay: 49,
//     annualPay: 37,
//     perYearPay: 444,
//     features: [
//       'Campaign management',
//       'Timeline with database',
//       'Fuzzy search',
//       'A/B testing sanbox',
//       'Custom permissions',
//       'Social media automation'
//     ],
//     current: false
//   }
]

const PricingPlan = () => {
  // States
  const { user,logout } = useAuth();
  const router = useRouter()
  const [pricingPlan, setPricingPlan] = useState('annually')
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const handleChange = e => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
    });
  };

  const handlePayment = async () => {
    setIsDisable(true)
    const res = await loadRazorpayScript();

    if (!res) {
      setIsDisable(false)
      alert('Failed to load Razorpay SDK.');
      return;
    }
    const amount = pricingPlan == "monthly" ? 250 : 3000 
    // Fetch the payment order ID from your backend
    const response = await CreateOrder({
      "companyId":user?.transactionID,
      "amount":amount
    });
    if(response.hasError){
      setIsDisable(false)
      return toastDisplayer("error",response.errorMessage)
    }
    const data = await response.responseData.result;
    
    const options = {
      key: "rzp_test_0yCaQoC8hI6DCW", 
      amount: data.amount,
      currency: data.currency,
      name: "Your Product Name",
      description: "Test Transaction",
      order_id: data.orderId,  // This comes from your backend
      handler: async function (response) {
        const verifyResponse = await VerifyOrder({
          "CompanyId": user?.transactionID,
          "sType": "Basic",
          "planType": pricingPlan,
          "amount": amount,
          RazorpayOrderId: response.razorpay_order_id,
          RazorpayPaymentId: response.razorpay_payment_id,
          RazorpaySignature: response.razorpay_signature
        });
        if(verifyResponse.hasError){
          setIsDisable(false)
          return toastDisplayer("error",response.errorMessage)
        }
        

        const verifyData = verifyResponse.responseData;

        if (verifyData.status) {
          setIsDisable(false)
          setPaymentStatus("Payment Successful!");
          logout();
          toastDisplayer("success","Payment Successful! \nYou will login again to get authroize.")
          return router.push("login")
        } else {
          setIsDisable(false)
          setPaymentStatus("Payment Failed. Please try again.");
          return toastDisplayer("error","Payment Failed. Please try again.");
        }
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
    };
    
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    setIsDisable(false)
  };

  return (
    <section
      id='pricing-plans'
    >
      <div >
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='tonal' color='primary' label='Pricing Plans' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            
            <Typography className='text-center'>
              Choose the best plan to fit your needs.
            </Typography>
          </div>
        </div>
        <div className='flex justify-center items-center max-sm:mlb-3 mbe-6'>
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
            Pay Monthly
          </InputLabel>
          <Switch id='pricing-switch' onChange={handleChange} checked={pricingPlan === 'annually'} />
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
            Pay Annually
          </InputLabel>
        </div>
        <Grid container spacing={6}>
          {pricingPlans.map((plan, index) => (
            <Grid item key={index} xs={12} lg={4}>
              <Card className={`${plan.current && 'border-2 border-[var(--mui-palette-primary-main)] shadow-xl'}`}>
                <CardContent className='flex flex-col gap-8 p-8'>
                  <div className='is-full flex flex-col items-center gap-3'>
                    <img src={plan.img} alt={plan.img} height='88' width='86' className='text-center' />
                  </div>
                  <div className='flex flex-col items-center gap-y-[2px] relative'>
                    <Typography className='text-center' variant='h4'>
                      {plan.title}
                    </Typography>
                    <div className='flex items-baseline gap-x-1'>
                      <Typography variant='h2' color='primary' className='font-extrabold'>
                      ₹{pricingPlan === 'monthly' ? plan.monthlyPay : plan.annualPay}
                      </Typography>
                      <Typography color='text.disabled' className='font-medium'>
                        /mo
                      </Typography>
                    </div>
                    {pricingPlan === 'annually' && (
                      <Typography color='text.disabled' className='absolute block-start-[100%]'>
                        ₹ {plan.perYearPay} / year
                      </Typography>
                    )}
                  </div>
                  <div>
                    <div className='flex flex-col gap-3 mbs-3'>
                      {plan.features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-[12px]'>
                          <CustomAvatar color='primary' skin={plan.current ? 'filled' : 'light'} size={20}>
                            <i className='tabler-check text-sm' />
                          </CustomAvatar>
                          <Typography variant='h6'>{feature}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  <LoadingButton
                      fullWidth
                      variant={plan.current ? 'contained' : 'tonal'}
                      onClick={handlePayment}
                      loading={isDisable}
                      loadingPosition="start"
                      type='submit'
                    >
                       {isDisable ? "Loading ...": "Get Started"}
                    </LoadingButton>
                  {/* <Button variant={plan.current ? 'contained' : 'tonal'} onClick={handlePayment}>
                    Get Started
                  </Button> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default PricingPlan