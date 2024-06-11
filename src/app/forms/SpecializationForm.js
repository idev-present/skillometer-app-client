import {number, object, string} from 'yup';
import { yupToFormErrors } from '@/shared/utils/yupToFormErrors.js'


export const SpecializationFormSchema = object({
  salary_from: number().required("Необходимо заполнить поле"),
  currency: string().required("Необходимо заполнить поле"),
  search_status_id: string().required("Необходимо заполнить поле"),
  qualification_id: string().required("Необходимо заполнить поле"),
  division_id: string().required("Необходимо заполнить поле"),
  skill_set: string().required("Необходимо заполнить поле"),
})

export const SpecializationForm = {
  validate(fields) {
    try {
      SpecializationFormSchema.validateSync(fields, { abortEarly: false });
    } catch (err) {
      return yupToFormErrors(err);
    }
  }
}

export default SpecializationForm;
