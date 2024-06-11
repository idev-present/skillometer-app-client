import {number, object, string} from 'yup';
import { yupToFormErrors } from '@/shared/utils/yupToFormErrors.js'


export const ProfileFormSchema = object({
  firstName: string().required("Необходимо заполнить поле"),
  lastName: string().required("Необходимо заполнить поле"),
  date: string().required("Необходимо заполнить поле"),
  city: string().required("Необходимо заполнить поле"),
  description: string().required("Необходимо заполнить поле"),
  gender: string().required("Необходимо заполнить поле"),
})

export const ProfileForm = {
  validate(fields) {
    try {
      ProfileFormSchema.validateSync(fields, { abortEarly: false });
    } catch (err) {
      return yupToFormErrors(err);
    }
  }
}

export default ProfileForm;
