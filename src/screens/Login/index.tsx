
import React, { useState } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup'
import { cpf } from "cpf-cnpj-validator";
import { styles } from './styles';
import { User, Lock } from 'phosphor-react-native'
import logo from '../../../assets/images/logo.png'
import { THEME } from '../../theme';

import { Input } from '../../components/Input';
import Button from '../../components/Button';
import HeaderLogo from '../../components/HeaderLogo';

const Login = () => {

  const loginValidationSchema = yup.object().shape({
    cpf: yup
      .string()
      .required('CPF é um campo obrigatório')
      .test({ message: "CPF inválido", test: (value) => cpf.isValid(value)}),
    password: yup
      .string()
      .min(6, ({ min }) => `A senha deve ter ao menos ${min} characters`)
      .required('Senha é um campo obrigatório'),
  })

  return (
    <>
      <HeaderLogo />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ cpf: '', password: '' }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
          <>
            <View>
              <Text style={{marginTop: 2}}>CPF</Text>

              <Input.Container>
                <Input.Icon>
                  <User color='#ffffff' />
                </Input.Icon>
                <Input.Input
                  onChangeText={handleChange('cpf')}
                  placeholder='00122233344'
                  placeholderTextColor={THEME.COLORS.INPUT}
                  autoCapitalize='none'
                  autoCorrect
                  onBlur={handleBlur('cpf')}
                  value={values.cpf}
                />
              </Input.Container>

              {errors.cpf &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.cpf}</Text>
              }
            </View>

            <View>
              <Text style={{marginTop: 2}}>Senha</Text>

              <Input.Container>
                <Input.Icon>
                  <Lock color='#ffffff' />
                </Input.Icon>
                <Input.Input
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder='******'
                  placeholderTextColor={THEME.COLORS.INPUT}
                  autoCapitalize='none'
                  autoCorrect
                  secureTextEntry
                />
              </Input.Container>

              {errors.password &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }
            </View>

            <Button onPress={() => handleSubmit()} title="Entrar" disabled={!isValid} />
          </>
        )}
      </Formik>

      <TouchableOpacity>
        <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
      </TouchableOpacity>
    </>
  )
}

export default Login;