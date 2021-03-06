<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required|exists:users,id',
            'name' => 'max:255',
            'email' => 'unique:users|max:255',
            'password' => 'max:255',
            'image_url' => 'max:255',
            'profile_id' => 'exists:profiles,id',
            'subject' => 'max:255'
        ];
    }
}
