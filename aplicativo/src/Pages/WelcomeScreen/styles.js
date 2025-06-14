import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0740e0',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 150,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  bigText: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  handle: {
    backgroundColor: '#ccc',
    width: 40,
    height: 6,
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: '#0740e0',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  arrow: {
    width: 100,
    height: 100,
  },
});
