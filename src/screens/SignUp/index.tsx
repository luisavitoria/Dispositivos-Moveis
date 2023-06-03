
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { User, Lock, IdentificationCard, Student, Envelope } from 'phosphor-react-native'
import { THEME } from '../../theme';
import HeaderLogo from '../../components/HeaderLogo';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { styles } from './styles';

const SignUp = () => {

    const [name, setName] = useState('')
    const [register, setRegister] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <HeaderLogo />

            <View>
                <Text>Nome completo</Text>

                <Input.Container>
                    <Input.Icon>
                        <User color='#ffffff' />
                    </Input.Icon>
                    <Input.Input value={name} onChangeText={setName} placeholder='Luísa Anjos' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect />
                </Input.Container>
            </View>

            <View>
                <Text>CPF</Text>

                <Input.Container>
                    <Input.Icon>
                        <IdentificationCard color='#ffffff' />
                    </Input.Icon>
                    <Input.Input value={cpf} onChangeText={setCpf} placeholder='01122233344' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect />
                </Input.Container>
            </View>

            <View>
                <Text>Número da matrícula</Text>

                <Input.Container>
                    <Input.Icon>
                        <Student color='#ffffff' />
                    </Input.Icon>
                    <Input.Input value={register} onChangeText={setRegister} placeholder='123456' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect />
                </Input.Container>
            </View>

            <View>
                <Text>E-mail</Text>

                <Input.Container>
                    <Input.Icon>
                        <Envelope color='#ffffff' />
                    </Input.Icon>
                    <Input.Input value={email} onChangeText={setEmail} placeholder='user@cesmac.edu.br' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect />
                </Input.Container>
            </View>


            <View>
                <Text>Senha</Text>

                <Input.Container>
                    <Input.Icon>
                        <Lock color='#ffffff' />
                    </Input.Icon>
                    <Input.Input value={password} onChangeText={setPassword} placeholder='******' placeholderTextColor={THEME.COLORS.INPUT} autoCapitalize='none' autoCorrect />
                </Input.Container>

            </View>


            <Button title='Cadastrar' />

            <TouchableOpacity>
                <Text style={styles.link}>Já possui conta? Entre agora!</Text>
            </TouchableOpacity>
        </>
    )
}

export default SignUp;