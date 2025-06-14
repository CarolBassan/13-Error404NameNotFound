import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0740e0',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  selectGroup: {
    flex: 1,
  },
  selectLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  backButton: {
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: '#0740e0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
