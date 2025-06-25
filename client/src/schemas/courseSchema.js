import * as yup from 'yup';

export const courseSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .required('O nome do curso é obrigatório.')
    .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  description: yup.string()
    .max(500, 'A descrição não pode exceder 500 caracteres.')
    .nullable(),
  start_date: yup.date()
    .required('A data de início é obrigatória.')
    .typeError('Data de início inválida.'),
  end_date: yup.date()
    .required('A data de fim é obrigatória.')
    .typeError('Data de fim inválida.')
    .min(
      yup.ref('start_date'),
      'A data de fim deve ser posterior à data de início.'
    ),
});