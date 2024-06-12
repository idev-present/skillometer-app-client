import {number, object, string} from 'yup';
import { yupToFormErrors } from '@/shared/utils/yupToFormErrors.js'


export const ExperienceFormSchema = object({
  company_name: string().required("Необходимо заполнить поле"),
  position: string().required("Необходимо заполнить поле"),
  start_date: string().required("Необходимо заполнить поле"),
  description: string().required("Необходимо заполнить поле"),
  skill_set: string().required("Необходимо заполнить поле"),
})

export const ExperienceForm = {
  validate(fields) {
    try {
      ExperienceFormSchema.validateSync(fields, { abortEarly: false });
    } catch (err) {
      return yupToFormErrors(err);
    }
  }
}

export default ExperienceForm;
