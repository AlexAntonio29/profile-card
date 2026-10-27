// Profile Card — practical task (React Native basics)
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';

// Data to display. Do not change it.
const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community.';

const STATS = [
  { label: 'Projects', value: '24' },
  { label: 'Followers', value: '1.2k' },
  { label: 'Following', value: '180' },
];

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];

// STEP 5: COLORS object — no hard-coded color strings anywhere else
const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1A1F2E',
  muted: '#7A8296',
  primary: '#4F6EF7',
  'primary-light': '#E8EDFE',
  border: '#E3E7EF',
  online: '#2ECC71',
};

// BONUS: reusable components with props
function StatItem({ label, value, isLast }) {
  return (
    <View style={[styles.stat, !isLast && styles.statDivider]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Tag({ label }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

export default function App() {
  // BONUS: respond to screen width
  const { width } = useWindowDimensions();
  const isWide = width > 600;

  return (
    <View style={styles.screen}>
      <View style={[styles.card, isWide && styles.cardWide]}>
        {/* STEP 2: banner */}
        <Image
          source={require('./assets/banner.png')}
          style={styles.banner}
          resizeMode="cover"
        />

        <View style={styles.body}>
          {/* STEP 3: header row (avatar + texts) */}
          <View style={styles.headerRow}>
            {/* STEP 4: wrapper for avatar + online badge */}
            <View style={styles.avatarWrapper}>
              <Image
                source={require('./assets/avatar.png')}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.onlineBadge} />
            </View>

            <View style={styles.headerText}>
              <Text style={styles.name}>Alexis Antonio</Text>
              <Text style={styles.role}>Mobile Developer</Text>
              <Text style={styles.location}>Jalisco, Mexico</Text>
            </View>
          </View>

          {/* STEP 1: bio (max 3 lines) */}
          <Text style={styles.bio} numberOfLines={3}>
            {BIO}
          </Text>

          {/* STEP 3: stats row */}
          <View style={styles.statsRow}>
            {STATS.map((stat, index) => (
              <StatItem
                key={stat.label}
                label={stat.label}
                value={stat.value}
                isLast={index === STATS.length - 1}
              />
            ))}
          </View>

          {/* BONUS: Skills title */}
          <Text style={styles.skillsTitle}>Skills</Text>

          {/* STEP 4: skill tags with flexWrap + gap */}
          <View style={styles.tagsRow}>
            {SKILLS.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </View>

          {/* STEP 4: action buttons */}
          <View style={styles.actionsRow}>
            <View style={styles.buttonPrimary}>
              <Text style={styles.buttonPrimaryText}>Follow</Text>
            </View>
            <View style={styles.buttonSecondary}>
              <Text style={styles.buttonSecondaryText}>Message</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // STEP 5: centered vertically, no top padding
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },

  // STEP 1 + STEP 5: card with shadow
  card: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    overflow: 'hidden', // banner follows top corners
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  // BONUS: maxWidth on wide screens
  cardWide: {
    maxWidth: 420,
  },

  // STEP 2: banner
  banner: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },

  // STEP 1: card padding (applied to body, not card, so banner bleeds to edges)
  body: {
    padding: 20,
  },

  // STEP 3: header row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -48, // STEP 2: avatar overlaps banner
  },

  // STEP 4: avatar wrapper for absolute badge
  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
    backgroundColor: COLORS.background,
  },

  // STEP 4: online badge
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.card,
  },

  headerText: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 4,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },

  role: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },

  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },

  // STEP 1 + STEP 5: bio with lineHeight
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text,
    marginTop: 16,
  },

  // STEP 3: stats row
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // STEP 5: divider merged via array
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },

  // BONUS: Skills title
  skillsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
  },

  // STEP 4: tags with flexWrap + gap
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tag: {
    backgroundColor: COLORS['primary-light'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999, // pill
  },

  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // STEP 4: buttons side by side, equal width
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  buttonPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonPrimaryText: {
    color: COLORS.card,
    fontWeight: '700',
    fontSize: 14,
  },

  buttonSecondary: {
    flex: 1,
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },

  buttonSecondaryText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});