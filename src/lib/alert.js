import Swal from 'sweetalert2'

export const alertSuccess = async (message) => {
  return Swal.fire({
    title: 'Success',
    text: message,
    icon: 'success',
  })
}

export const alertError = async (message) => {
  return Swal.fire({
    title: 'Ups!',
    text: message,
    icon: 'error',
  })
}

export const alertConfirm = async (message, buttonTxt) => {
  return Swal.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: buttonTxt,
  })
}
