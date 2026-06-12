import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { ScHeader } from './components/ScHeader';
import { getProject } from './data';
import { scTheme } from './theme';

type Route = RouteProp<RootStackParamList, 'ScRegister'>;

export const ScRegisterScreen: React.FC = () => {
  const route = useRoute<Route>();
  const project = getProject(route.params?.projectId ?? 'sc1');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
    `https://www.scasset.com/register?project=${project.id}`,
  )}`;

  const handleSave = () => {
    // POC — no backend; just acknowledge the capture
    setSaved(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScHeader active="Register" tabs={['Present', 'Consult', 'Browse', 'Register']} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>ลงทะเบียนความสนใจ</Text>
        <Text style={styles.subtitle}>เลือกวิธีลงทะเบียนที่เหมาะสมกับสถานการณ์</Text>

        <View style={styles.projectBar}>
          <Text style={styles.projectBarText}>
            <Text style={styles.projectBarName}>{project.name}</Text>
            {'  —  '}
            {project.type} • {project.location}
          </Text>
        </View>

        <View style={styles.columns}>
          <View style={styles.qrColumn}>
            <Image source={{ uri: qrUrl }} style={styles.qr} />
            <Text style={styles.qrTitle}>ให้ลูกค้าสแกน QR Code นี้</Text>
            <Text style={styles.qrCaption}>
              ลูกค้ากรอกข้อมูลผ่านมือถือของตัวเอง{'\n'}ข้อมูลจะถูกบันทึกเข้าระบบโดยอัตโนมัติ
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.formColumn}>
            <Text style={styles.formTitle}>กรอกข้อมูล</Text>
            <Text style={styles.formCaption}>พนักงานขายช่วยบันทึกข้อมูลให้ลูกค้า</Text>

            <Text style={styles.fieldLabel}>ชื่อ</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="กรุณากรอกชื่อ"
              placeholderTextColor={scTheme.colors.textSecondary}
            />

            <Text style={styles.fieldLabel}>นามสกุล</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="กรุณากรอกนามสกุล"
              placeholderTextColor={scTheme.colors.textSecondary}
            />

            <Text style={styles.fieldLabel}>เบอร์โทรศัพท์</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="0XX-XXX-XXXX"
              placeholderTextColor={scTheme.colors.textSecondary}
              keyboardType="phone-pad"
            />

            <Text style={styles.fieldLabel}>อีเมล (ไม่บังคับ)</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor={scTheme.colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Pressable style={styles.cta} onPress={handleSave}>
              <Text style={styles.ctaText}>บันทึกความสนใจ</Text>
            </Pressable>
            {saved && (
              <Text style={styles.savedText}>✓ บันทึกข้อมูลเรียบร้อยแล้ว</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: scTheme.colors.background,
  },
  scroll: {
    paddingHorizontal: scTheme.spacing.xl,
    paddingBottom: scTheme.spacing.xl,
  },
  title: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.xxl,
    fontWeight: '800',
    marginTop: scTheme.spacing.md,
  },
  subtitle: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
    marginTop: scTheme.spacing.xs,
  },
  projectBar: {
    backgroundColor: scTheme.colors.surfaceMuted,
    borderLeftWidth: 3,
    borderLeftColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.sm,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: scTheme.spacing.md,
    marginTop: scTheme.spacing.lg,
  },
  projectBarText: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
  },
  projectBarName: {
    color: scTheme.colors.text,
    fontWeight: '700',
  },
  columns: {
    flexDirection: 'row',
    gap: scTheme.spacing.xl,
    marginTop: scTheme.spacing.xl,
  },
  qrColumn: {
    flex: 1,
    alignItems: 'center',
    gap: scTheme.spacing.md,
  },
  qr: {
    width: 280,
    height: 280,
    borderRadius: scTheme.borderRadius.md,
    backgroundColor: '#FFFFFF',
  },
  qrTitle: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.lg,
    fontWeight: '700',
  },
  qrCaption: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  divider: {
    width: 1,
    backgroundColor: scTheme.colors.border,
  },
  formColumn: {
    flex: 1,
    gap: scTheme.spacing.xs,
  },
  formTitle: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.lg,
    fontWeight: '700',
  },
  formCaption: {
    color: scTheme.colors.textSecondary,
    fontSize: scTheme.fontSize.xs,
    marginBottom: scTheme.spacing.sm,
  },
  fieldLabel: {
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.sm,
    fontWeight: '600',
    marginTop: scTheme.spacing.sm,
  },
  input: {
    backgroundColor: scTheme.colors.surface,
    borderWidth: 1,
    borderColor: scTheme.colors.border,
    borderRadius: scTheme.borderRadius.sm,
    paddingHorizontal: scTheme.spacing.md,
    paddingVertical: scTheme.spacing.sm + 2,
    color: scTheme.colors.text,
    fontSize: scTheme.fontSize.sm,
  },
  cta: {
    backgroundColor: scTheme.colors.primary,
    borderRadius: scTheme.borderRadius.pill,
    paddingVertical: scTheme.spacing.md,
    alignItems: 'center',
    marginTop: scTheme.spacing.lg,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: scTheme.fontSize.md,
    fontWeight: '700',
  },
  savedText: {
    color: scTheme.colors.success,
    fontSize: scTheme.fontSize.sm,
    textAlign: 'center',
    marginTop: scTheme.spacing.sm,
  },
});
