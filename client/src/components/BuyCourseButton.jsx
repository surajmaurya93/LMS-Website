import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react';
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi';
import { toast } from 'sonner';

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId)
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.url)
        window.location.href = data.url; //redirect to stripe checkout
    } else {
      // toast.error("Invalid Response From Server")
    }
    if (isError) {
      toast.error(error?.data?.message || "failed to create checkout"
      )
    }
  }, [isSuccess, data, isError, error])

  return (
    <Button disabled={isLoading} className="w-full" onClick={purchaseCourseHandler}>
      {
        isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            please wait
          </>
        ) : "Purchase Course"
      }
    </Button>
  );
};

export default BuyCourseButton
