import { StyleSheet } from "react-native";

export default StyleSheet.create({
  camera: {
    flex: 1,
  },

  topContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },

  iconCenter: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },

  sideIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },

  sideIconTouchable: {
    padding: 10,
  },

  sideIcon: {
    width: 50,
    height: 50,
  },

  fullscreenButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBoxShadow: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
