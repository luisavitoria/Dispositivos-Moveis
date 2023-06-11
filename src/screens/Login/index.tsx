
import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Context as AuthContext } from '../../context/AuthContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import { cpf } from "cpf-cnpj-validator";
import { styles } from './styles';
import { Envelope, Lock } from 'phosphor-react-native'
import { THEME } from '../../theme';

import { Input } from '../../components/Input';
import Button from '../../components/Button';
import HeaderLogo from '../../components/HeaderLogo';

interface LoginProps {
  navigation: StackNavigationProp<any, any>;
}

const Login = ({ navigation }: LoginProps) => {

  const { login, errorMessage } = useContext(AuthContext)

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é um campo obrigatório'),
    password: yup
      .string()
      .min(6, ({ min }) => `A senha deve ter ao menos ${min} caracteres`)
      .required('Senha é um campo obrigatório'),
  })

  return (
    <>
      <KeyboardAvoidingView style={styles.container} contentContainerStyle={styles.containerPosition} behavior={Platform.OS === 'ios' ? "padding" : "position"}>
        <HeaderLogo />

        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            login && login(values)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
              <View>
                <Text style={{ marginTop: 2 }}>E-mail</Text>

                <Input.Container>
                  <Input.Icon>
                    <Envelope color='#ffffff' />
                  </Input.Icon>
                  <Input.Input
                    onChangeText={handleChange('email')}
                    placeholder='user@cesmac.edu.br'
                    placeholderTextColor={THEME.COLORS.INPUT}
                    autoCapitalize='none'
                    autoCorrect
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </Input.Container>

                {errors.email &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                }
              </View>

              <View>
                <Text style={{ marginTop: 2 }}>Senha</Text>

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
      </KeyboardAvoidingView>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={{ textAlign: 'center', marginTop: 18, color: "red" }}>E-mail ou senha incorreta</Text>}
    </>
  )
}

export default Login;