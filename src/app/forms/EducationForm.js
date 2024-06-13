import {number, object, string} from 'yup';
import { yupToFormErrors } from '@/shared/utils/yupToFormErrors.js'


export const EducationFormSchema = object({
  university_name: string().required("Необходимо заполнить поле"),
  faculty_name: string().required("Необходимо заполнить поле"),
  city_id: string().required("Необходимо заполнить поле"),
  start_date: string().required("Необходимо заполнить поле"),
  specialization: string().required("Необходимо заполнить поле"),
})

export const EducationForm = {
  validate(fields) {
    try {
      EducationFormSchema.validateSync(fields, { abortEarly: false });
    } catch (err) {
      return yupToFormErrors(err);
    }
  }
}

export default EducationForm;
